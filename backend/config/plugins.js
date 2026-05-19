'use strict';

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId:     env('DO_SPACES_KEY'),
        secretAccessKey: env('DO_SPACES_SECRET'),
        // DigitalOcean Spaces is S3-compatible — point to the regional endpoint
        endpoint: `https://${env('DO_SPACES_REGION', 'nyc3')}.digitaloceanspaces.com`,
        params: {
          ACL:    'public-read',
          Bucket: env('DO_SPACES_BUCKET'),
        },
      },
      actionOptions: {
        upload:       {},
        uploadStream: {},
        delete:       {},
      },
    },
  },
});
