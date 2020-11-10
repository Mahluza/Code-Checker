import DetectionModel from "./DetectionModel";
import Director from "./Director";
import FileModel from "./fileModel";
import IDetectionBuilder from "./IDetectionBuilder";

export default class DetectionBuilder implements IDetectionBuilder{
    buildFile(id: number): FileModel {
        let fileModel = new FileModel();
        Director.setFileModel(id, fileModel);
        return fileModel;
    }
    buildDetection(file1Id: number, file2Id: number): DetectionModel {
        // let file1 = Director.getFileModel(file1Id);
        // let file2 = Director.getFileModel(file2Id);
        let detectionModel = new DetectionModel(null, null);
        Director.setDetectionModel(detectionModel);
        return detectionModel;
    }
}