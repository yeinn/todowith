import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('Current Working Directory:', process.cwd());
console.log('Supabase URL (from main.ts): ', process.env.SUPABASE_URL);
console.log('Supabase Key (from main.ts): ', process.env.SUPABASE_KEY);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
