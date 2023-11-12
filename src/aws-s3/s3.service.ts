import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  DeleteObjectCommand,
  DeleteObjectRequest,
  DeleteObjectCommandOutput
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: configService.getOrThrow('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('AWS_S3_SECRET_ACCESS_KEY')
      }
    });
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
    const region = this.configService.getOrThrow('AWS_S3_REGION');
    const options: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucketName,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(options),
      );
      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
      }
      throw new Error('The file is not saved to s3');
    } catch (err) {
      this.logger.error('The file is not saved to s3,', err);
      throw err;
    }
  }

  @OnEvent('collection.removed')
  async removeFile(id: string) {
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
    const options: DeleteObjectRequest = {
      Bucket: bucketName,
      Key: id
    };

    try {
      const response: DeleteObjectCommandOutput = await this.s3.send(
        new DeleteObjectCommand(options),
      );
      console.log(response)
      if (response.$metadata.httpStatusCode === 204) {
        return response;
      }
      throw new Error('The file is not deleted from s3');
    } catch (err) {
      this.logger.error('The file is not deleted from s3,', err);
      throw err;
    }
  }
}