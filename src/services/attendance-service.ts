"use client";

import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import {
  GetAttendanceDetailsQueryResponse,
  updatedAttendanceDetails,
  updatedGetAttendanceDetailsQueryResponse,
} from "@/types/types";

const GET_ATTENDANCE_DETAILS_QUERY = gql`
  query GABD($date:NaiveDate!) {
    attendanceByDate(date: $date ) {				 
      memberId
      name
      year
      timeIn
      timeOut
      isPresent
    }
  }
`;

export const AttendanceService = {
  // Function to get attendance details based on a specific date
  async getAttendanceDetails(date: string): Promise<updatedAttendanceDetails[]> {
    try {
      const [attendanceResponse] = await Promise.all([
        client.query<updatedGetAttendanceDetailsQueryResponse>({
          query: GET_ATTENDANCE_DETAILS_QUERY,
          variables: { date },
        }),
      ]);

      const attendanceDetails = attendanceResponse.data.attendanceByDate;
      return attendanceDetails;
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      throw new Error("Could not fetch attendance details");
    }
  },
};
