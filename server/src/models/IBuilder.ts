import DetectionModel from "./DetectionModel";
import FileModel from "./fileModel";
import UserModel from "./UserModel";

export default interface IBuilder {
    buildFile(id: number): FileModel;
    buildDetection(file1Id: number, file2Id: number): DetectionModel;
    buildUser(firstName: string, lastName: string, institution: string, email: string, password: string): UserModel;
}