import FileModel from "./fileModel";

export default class DetectionModel{
    constructor(private File1: FileModel, private File2: FileModel){

    }

    run(){
        console.log("New world!!!!");
    }
}