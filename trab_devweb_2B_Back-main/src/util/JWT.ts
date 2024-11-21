import jwt from 'jsonwebtoken';

interface User{
    email: string,
    passworld: string
}

const privateKey = "-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgQCQREIIYkl93c+AUiD0UlZUgv45CTOT4YXJTMHiGtxXpOKdjozaEhJ18AExQNvUsHpgy8NDf/1RykHLn2xWHUQ+sNfHvt9ND3aPS3QDBttSMiEJWOu8/4mdXq3X55qSE3r4MbTGRN7FJPMjzpcVZwryxPxMQF3kB0B9RG0tp/9k/QIDAQABAoGAMZUEDNWa5INjWXrgkJfry8fpj7i13VFZJcIXsJoCuKyWpgfkKN6lMZt3DXJ5GzQ8GyBsz7ohWgblbhIwrbgJR+5De8kUNya1US/OP3UKT3vv73N3MnrhYmOIeF+oFU/yLuhNlVxwAcLzbhDR+6VpDweSuD4i3hcdNoJBnJkxD4ECQQDKFavtlPci6/id2ifaqza7htdez/xwitp7bD26vMEBF/4Ykm4Qlp1DpRvCvLEoZg/qCHuxLGiy1M4X0t56wYC1AkEAtsGheKNk8FraocmCZGezvM2e0kDIN9hJFTuOiQ85OfHhBSABzWJofovk/eVAePbw8QcAgz8p1paJfeN4vj+oKQJAXYa4ImWuFyh00MGVbluNIi8e4A+MOp3YzgRjcVhITvRGsiKa8+xw7kys02y25QaPWPYCIRZ3gkSA+X+rXc7OfQJAMJxgbs5HUwdXkCEhZcOPs3CeBh7lIrWM+vDUgPBjsF3+FHbnA9JhKQfc6QvJkmNcwz+xizeJ0WJJQAr5WuFjwQJBALAgJ2Q1GsN8CzYxOEpl1nnFJfOi/j967I/wM04kA87Z6tF7pFjjIgz5akrK2XfzNSDO1nVNTl9wkalgpE63d9E=-----END RSA PRIVATE KEY-----"

export async function generateJWToken(user: User){
    const token = jwt.sign(JSON.stringify(user), privateKey, {algorithm : "HS256"})
    return token;
}

export async function decodeToken(token: string){
    try {
        const decodedUser = jwt.verify(token, privateKey, { algorithms: ["HS256"] }) as User;
        return decodedUser;
    } catch (error) {
        throw new Error("Token inválido");
    }
}