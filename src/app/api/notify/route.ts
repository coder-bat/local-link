import { NextRequest, NextResponse } from 'next/server';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: process.env.AWS_REGION });
const topicArn = process.env.SNS_TOPIC_ARN;

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const { action, address } = data;
    if (!action) {
      return NextResponse.json({ error: 'Missing action' }, { status: 400 });
    }

    const message = action === 'assist' ? `Assistance requested at ${address}` : `Request to turn down the music received from ${address}`;

    if (!topicArn) {
      return NextResponse.json({ error: 'SNS_TOPIC_ARN not set' }, { status: 500 });
    }

    await snsClient.send(
      new PublishCommand({
        TopicArn: topicArn,
        Message: message,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
