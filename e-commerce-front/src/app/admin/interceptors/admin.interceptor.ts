import { HttpInterceptorFn } from '@angular/common/http';

import { UserStorageService } from '../../services/user-storage.service';

export const adminInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url === 'http://localhost:8080/authenticate' ||
    req.url === 'http://localhost:8080/sign-up'
  ) {
    return next(req);
  }
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${UserStorageService.getToken()}`,
    },
  });
  return next(cloneReq);
};
