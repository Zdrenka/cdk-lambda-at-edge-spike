#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkLambdaAtEdgeSpikeStack } from "../lib/cdk-lambda-at-edge-spike-stack";

export const props = {
  env: {
    region: "us-east-1",
  },
};

const app = new cdk.App();
new CdkLambdaAtEdgeSpikeStack(app, "CdkLambdaAtEdgeSpikeStack", props);
