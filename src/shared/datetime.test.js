import { getDay, getTime } from './datetime';

describe('datetime function', () => {
  describe('get day', () => {
    it('should return day correctly', () => {
      const testCases = [
        {
          text: '2021-04-21 19:00:00',
          day: '21 Apr 21',
        },
        {
          text: '1989-01-01 00:00:00',
          day: '1 Jan 89',
        },
        {
          text: '2021-12-31 20:00:00',
          day: '31 Dec 21',
        },
        {
          text: '2029-08-15 09:00:00',
          day: '15 Aug 29',
        },
        {
          text: '2011-11-11 11:11:11',
          day: '11 Nov 11',
        },
      ];

      testCases.forEach((testCase) => {
        expect(getDay(testCase.text)).toBe(testCase.day);
      });
    });
  });

  describe('get time', () => {
    it('should return time correctly', () => {
      const testCases = [
        {
          text: '2021-04-21 00:00:00',
          time: '00:00 AM',
        },
        {
          text: '2021-04-21 05:00:00',
          time: '5:00 AM',
        },
        {
          text: '1989-01-01 10:50:50',
          time: '10:50 AM',
        },
        {
          text: '2021-12-31 12:02:00',
          time: '12:02 PM',
        },
        {
          text: '2029-08-15 19:45:00',
          time: '7:45 PM',
        },
      ];

      testCases.forEach((testCase) => {
        expect(getTime(testCase.text)).toBe(testCase.time);
      });
    });
  });
});
