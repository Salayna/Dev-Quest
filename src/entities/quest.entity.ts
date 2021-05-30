import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Quest {
  @PrimaryColumn('uuid')
  id: string
}