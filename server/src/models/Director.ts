import DetectionModel from "./DetectionModel";
import FileModel from "./fileModel";
import UserModel from "./UserModel";

export default class Director{
    private static fileMapIndex: number = 0;
    private static detectionMapIndex: number = 0;
    private static userModelMap: Map<string, UserModel> = new Map();
    private static fileModelMap: Map<number, FileModel> = new Map();
    private static detectionModelMap: Map<number, DetectionModel> = new Map();

    static setFileModel(id: number, model: FileModel): number{
        this.fileMapIndex++;
        this.fileModelMap.set(id, model);
        return this.fileMapIndex;
    }
    static getFileModel(id: number): FileModel{
        return this.fileModelMap.get(id);
    }
    static setDetectionModel(model: DetectionModel): number{
        this.detectionMapIndex++;
        this.detectionModelMap.set(this.detectionMapIndex, model);
        return this.detectionMapIndex;
    }
    static getDetectionModel(id: number): DetectionModel{
        return this.detectionModelMap.get(id);
    }

    static setUserModel(email: string, model: UserModel){
        this.userModelMap.set(email, model);
    }

    static getUserModel(email: string): UserModel{
        return this.userModelMap.get(email);
    }
}