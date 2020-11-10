import DetectionModel from "./DetectionModel";
import FileModel from "./fileModel";

export default interface IDetectionBuilder {
    buildFile(id: number): FileModel;
    buildDetection(file1Id: number, file2Id: number): DetectionModel;
}