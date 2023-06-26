import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  evn: process.env.NODE_ENV,
  port: process.env.PORT,
  databaser_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASS,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_numbers: process.env.BCRYPT_SALT_ROUNDS,
};
