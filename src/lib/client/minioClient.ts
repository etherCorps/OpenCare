import Minio from 'minio';

const minioClient = new Minio.Client({
	endPoint: 'play.minio.io',
	port: 9000,
	accessKey: 'Q3AM3UQ867SPQQA43P2F',
	secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});
