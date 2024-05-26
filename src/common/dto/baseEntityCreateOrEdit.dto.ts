import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntityCreateOrEditDto {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
