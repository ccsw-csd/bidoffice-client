import { Pageable } from "src/app/core/models/Pageable";
import { User } from "./User"

export class UserPage{
  content: User[];
  pageable: Pageable;
  totalElements: number;

  constructor(content: User[], pageable: Pageable, totalElements: number) {
    this.content = content;
    this.pageable = pageable;
    this.totalElements = totalElements;
  }
}
