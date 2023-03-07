import { usersList } from '@/api/user';
import { refreshToken } from '@/api/refresh';
import { useDate } from '@/hooks/useDate';

export default {
  takeUsersList: async ({ state, commit }: any) => {
    if (state.user.usersList) {
      commit('saveUserList', { key: 'usersList', value: [] });
    }
    const query: { [key: string]: number } = {
      limit: state.page.queryInfo.limit,
      offset: state.page.queryInfo.offset
    };
    const res = await usersList<{ [key: string]: number }>(query);
    res.data.map((item: { [key: string]: string }) => {
      item.create_time = useDate(item.create_time);
      item.update_time = useDate(item.create_time);
      item.last_login = useDate(item.create_time);
    });
    if (res.status === 200) {
      commit('saveUserList', { key: 'usersList', value: [res.data] });
    };
  },
  refresh: ({ state, commit }: any): void => {

  }
}
