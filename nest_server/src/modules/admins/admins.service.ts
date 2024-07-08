import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { validAdminDto } from './dto/valid-admin.dto';

@Injectable()
export class AdminsService {

  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin> ){}

  async create(createAdminDto: CreateAdminDto) {
    const newAdmin = new Admin()
    newAdmin.user = createAdminDto.user;

    const passwordEncripted = await hash(createAdminDto.password, 10);
    newAdmin.password = passwordEncripted;

    const adminCreated = await this.adminRepository.save(newAdmin)

    return adminCreated;
  }

  async validateAdmin(validAdminDto: validAdminDto){

    const { user, password } = validAdminDto;
    const adminFound = await this.adminRepository.findOne({ where: {user} });

    if (!adminFound) {
      throw new Error('Admin not found');
    }

    const isPasswordValid = await compare(password, adminFound.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    console.log(adminFound)
    return adminFound;
  }

  findAll() {
    return `This action returns all admins`;
  }

  async findOne(id: number) {
    // return await this.adminRepository.findOne({ user: user });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
