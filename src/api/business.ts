import { request } from './request';
import { PageData } from '@/interface';
import { BuniesssUser } from '@/interface/business';
// import { supabase } from '@supabase/supabase-js';
import { supabase } from './../config/supabase';

export const getBusinessUserList = async (params: any) => {
  params = await supabase.from('classes').select('*');

  // request<PageData<BuniesssUser>>('get', '/business/list', params);

  return params;
};
