import { Types } from "mongoose";
import { IUserDTO, UserRoles } from "../../shared/index";

class UserDTO {
  _id: Types.ObjectId;
  profilePic: string;
  name: string;
  email: string;
  role: UserRoles;

  constructor(user: IUserDTO) {
    this._id = user._id;
    this.profilePic = user.profilePic;
    this.name = user.name;
    this.email = user.email;
    this.role = user.role;
  }
}

export default UserDTO;
