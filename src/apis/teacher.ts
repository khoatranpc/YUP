import { Teacher } from 'types/teacher';

import axios from './axios';
import { CreateTeacherDto } from './dto/teacher.dto';

export const getTeachers = () => {
  return axios.get<Teacher[]>('/teacher');
};

export const createTeacher = (createTeacherDto: CreateTeacherDto) => {
  return axios.post('/teacher', createTeacherDto);
};
