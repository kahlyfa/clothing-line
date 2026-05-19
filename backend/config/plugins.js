'use strict';

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId:     env('DO_SPACES_KEY'),
            secretAccessKey: env('DO_SPACES_SECRET'),
          },
          endpoint: `https://${env('DO_SPACES_REGION', 'nyc3')}.digitaloceanspaces.com`,
          region:   env('DO_SPACES_REGION', 'nyc3'),
          params: {
            ACL:    'public-read',
            Bucket: env('DO_SPACES_BUCKET'),
          },
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
