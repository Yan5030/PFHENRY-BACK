export interface JwtPayload {
    email: string;
    name: string;
    picture?: string;
    sub: string;
    roles?: string[];
}
