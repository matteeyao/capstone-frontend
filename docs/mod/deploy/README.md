# Deploy React apps on Amazon S3

## Prerequisites

**Create a AWS user**: **IAM** ▶︎ **Users**

* Click on `Add User` and check `Programmatic access`

![Fig. 1 Create an IAM user](https://miro.medium.com/max/1400/1*gMtvyUQ_X2YVYHwNfLeygg.png)

* Click `Next: Permissions` and select `Attach existing policies directly`

* Check `AdministratorAccess` for the deployment purpose

![Fig. 2 Grant AdministratorAccess](https://miro.medium.com/max/1400/1*UfuPz5oak9QbxX0VXlNV5g.png)

* Click through the Next buttons and finally click on `Create user`:

![Fig. 3 Create user](https://miro.medium.com/max/1400/1*aSCgwjWRAiNQHBV_bSRlvA.png)

In the final step, we receive an Access key ID and Secret access key. Download and **save them to your computer as you will need this later**.

## Install AWS CLI

The AWS CLI is a powerful tool which can help us simplify the deployment process.

> [!NOTE]
> If you are using Windows, you can find the instructions on the official docs [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html).

To install AWS CLI using [Homebrew](https://brew.sh/), open your terminal and enter `brew install awscli`

Once the CLI tool is installed, we can configure our AWS account w/ `AWS configure`. This is where you will enter the access key information you previously downloaded. It should look something like the following:

![Fig. 4 AWS configure](https://miro.medium.com/max/1400/1*TbFgHQ9ey3SwBWtadBtqSQ.png)

For region, you can check your URL on AWS Console and it will mention your region. For example, `us-east-1`.

## Creating a React app

If you need a sample React app, choose from the following options:

1. Generate a boilerplate React app by running `npx create-react-app my-app`

2. Download the sample React app (w/ a form example) from [link](https://github.com/harishv7/react-hook-form-example). This was done for a tutorial to add forms to React apps. Check it out [here](https://www.youtube.com/watch?v=48dIFJk6roU&t=852s).

Once done, make sure the dependencies are all installed using `yarn install` and give the app a run using `yarn start`.

## Setup a S3 Bucket

Now that we have our sample app ready, let's configure a S3 bucket to host our app.

On AWS Console, search for "S3" and go to S3 Dashboard. Click on `Create bucket` and give the bucket a name.

> [!NOTE]
> The bucket name has to be unique across AWS S3. So choose a unique name which dows not exist, else you will get an error.

Enable public access to the bucket since we are hosting it live:

![Fig.5 Enable public access](https://miro.medium.com/max/1400/1*Mqn0JUnqAvMMmimuLj7rTg.png)

Leave the rest of the settings as what they are and click `Create bucket`. You will immediately see the bucket in your S3 dashboard.

Let's go into our newly created S3 bucket.

![Fig. 6 S3 Bucket dashboard](https://miro.medium.com/max/1400/1*PNhe4x_fs02RmMKIQmGbng.png)

Let's click on `Properties` and scroll all the way to the bottom where you will see `Static website hosting`.

![Fig. 7 Static website hosting](https://miro.medium.com/max/1400/1*mRdXzoHrc1LHQ8Hy-2V4UQ.png)

Click on `Enable` and enter `index.html` under **Index document**.

Leave the other fields the same and click on `Save changes`.

## Deploying to S3

Now, we are ready to deploy our app to S3. The way to do that is to use the following CLI command:

```zsh
aws s3 sync build/ s3://<your-bucket-name> --acl public-read
```

We can add this command to our `package.json` file too as a `deploy` script.

![Fig. 8 Deploy script](https://miro.medium.com/max/1400/1*BY8AO0YO7WqOUMPWA_XsVQ.png)

Let's build our app using `yarn build` which helps to create an optimized production build.

