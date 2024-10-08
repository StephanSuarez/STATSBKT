import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { from, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {

  private bucketName = environment.bucketName;
  private region = environment.region;
  private accessKeyId = environment.accessKeyId;
  private secretAccessKey = environment.secretAccessKey;

  private s3Client: S3Client;

  constructor() {
    // Configurar el cliente de S3
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey
      }
    });
  }

  uploadTeamFile(file: File): Observable<any> {
    // El archivo es de tipo File, que extiende Blob, por lo que debe ser compatible con Body
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: `teams/${file.name}`,
      Body: file, // Se acepta File porque es un tipo Blob en navegadores
      ACL: 'public-read' // Hacer que el archivo sea público
    };

    const command = new PutObjectCommand(params);

    return from(this.s3Client.send(command));
  }

  uploadPlayerFile(file: File): Observable<any> {
    // El archivo es de tipo File, que extiende Blob, por lo que debe ser compatible con Body
    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: `players/${file.name}`,
      Body: file, // Se acepta File porque es un tipo Blob en navegadores
      ACL: 'public-read' // Hacer que el archivo sea público
    };    

    const command = new PutObjectCommand(params);

    return from(this.s3Client.send(command));
  }
}
