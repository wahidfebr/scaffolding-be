import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const APP_HOST = configService.get<string>("APP_HOST") || "localhost";
  const APP_PORT = configService.get<number>("APP_PORT") || 3000;

  await app.listen(APP_PORT, APP_HOST, () => {
    console.log(`HTTP Server started at http://${APP_HOST}:${APP_PORT}`);
  });
}
bootstrap();
