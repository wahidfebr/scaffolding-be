import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { ConfigService } from "@nestjs/config";
import { User } from "./user/infrastructure/user.model";
import { User as UserEntity } from "./user/entity/user.entity";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const APP_HOST = configService.get<string>("APP_HOST") || "localhost";
  const APP_PORT = configService.get<number>("APP_PORT") || 3000;

  const admin = UserEntity.create({
    email: "admin@gmail.com",
    username: "admin",
  });
  await admin.setPassword("password");

  console.log(admin, "<<<<<<<< entity");
  const [adminInfra, created] = await User.findOrCreate({
    where: {
      email: admin.email,
    },
    defaults: admin.unmarshal(),
  });

  if (!created) {
    // const newAdmin = UserEntity.create(adminInfra.toJSON());
    // await newAdmin.setPassword("password" + Math.random());
    adminInfra.ssoType = "Github";
    await adminInfra.save();
  }
  console.log(adminInfra.toJSON(), "<<<<<<<<<< infra");

  await app.listen(APP_PORT, APP_HOST, () => {
    console.log(`HTTP Server started at http://${APP_HOST}:${APP_PORT}`);
  });
}
bootstrap();
