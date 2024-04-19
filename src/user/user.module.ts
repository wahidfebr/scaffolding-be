import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "@/user/infrastructure/user.model";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [],
  exports: [],
})
export class UserModule {}
