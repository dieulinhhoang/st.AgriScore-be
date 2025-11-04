import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
//Guard (bảo vệ)dùng để chặn các route (đường dẫn API) và yêu cầu người dùng phải gửi một JWT (JSON Web Token) hợp lệ thì mới được truy cập.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }
}