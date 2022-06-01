import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_cloudfront as cloudfront } from "aws-cdk-lib";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_cloudfront_origins as origins } from "aws-cdk-lib";

export class CdkLambdaAtEdgeSpikeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const headerFunction = new cloudfront.experimental.EdgeFunction(
      this,
      "Headers",
      {
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: "headers.handler",
        code: lambda.Code.fromAsset("resources"),
      }
    );

    const dist = new cloudfront.Distribution(this, "dev-lankester-dist", {
      defaultBehavior: {
        origin: new origins.HttpOrigin("amplience.com", {
          originPath: "/developers/",
        }),

        edgeLambdas: [
          {
            functionVersion: headerFunction.currentVersion,
            eventType: cloudfront.LambdaEdgeEventType.ORIGIN_RESPONSE,
          },
        ],
      },
    });

    new CfnOutput(this, "dev-lankester-dist-output", {
      value: dist.distributionDomainName,
    });
  }
}
