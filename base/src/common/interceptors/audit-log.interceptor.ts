import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { PrismaService } from '../../prisma/prisma.service';
  
  @Injectable()
  export class AuditLogInterceptor implements NestInterceptor {
    constructor(private prisma: PrismaService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const method = request.method;
      const url = request.url;
  
      // Only log for state-changing operations
      if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        return next.handle();
      }
  
      return next.handle().pipe(
        tap(async (data) => {
          try {
            await this.prisma.auditLog.create({
              data: {
                action: method,
                entity: this.extractEntityFromUrl(url),
                entityId: this.extractEntityId(url, data),
                userId: user?.id,
                metadata: {
                  url,
                  userAgent: request.headers['user-agent'],
                  ip: request.ip,
                },
              },
            });
          } catch (error) {
            console.error('Failed to create audit log:', error);
          }
        }),
      );
    }
  
    private extractEntityFromUrl(url: string): string {
      const segments = url.split('/');
      return segments[3] || 'unknown'; // Assuming /api/v1/entity format
    }
  
    private extractEntityId(url: string, data: any): string {
      const segments = url.split('/');
      const lastSegment = segments[segments.length - 1];
      
      // If URL contains ID, use it; otherwise try to get from response data
      if (lastSegment.match(/^[a-zA-Z0-9_-]+$/)) {
        return lastSegment;
      }
      
      return data?.id || data?.data?.id || 'unknown';
    }
  }