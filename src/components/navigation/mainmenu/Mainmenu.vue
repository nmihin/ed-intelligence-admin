 <template>          
              <!-- Main Menu -->
              <div class="dashboard-menu">
                <ul>
                  <li>
                    <router-link to="/home"><i class="icon icon-home"></i>Home</router-link>
                  </li>
                  <li>
                    <ul class="megamenu d-flex flex-nowrap">
                      <li><strong>General</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> General</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> School Settings</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> User Accounts</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Manage Menu</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Code Book</a></li>
                        </ul>
                      </li>
                      <li><strong>Reports</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> PMF Measures</a></li>
                        </ul>
                      </li>
                      <li><strong>Classes</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Home Room</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> School Year</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Subject Manager</a></li>
                        </ul>
                      </li>
                      <li><strong>Notification</strong>
                        <ul>
                          <li><router-link to="/list-template"><i class="icon icon-arrow-gray"></i> Manage Template</router-link></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Notification Email List</a></li>
                        </ul>
                      </li>
                      <li><strong>Project Commit</strong></li>
                    </ul>
                    <router-link to="/settings"><i class="icon icon-settings"></i>Settings</router-link>
                  </li>
                  <li>
                    <ul class="megamenu d-flex flex-nowrap">
                      <li><strong>General Reports</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Student List</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Staff List</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Withdrawn Student List</a></li>
                          <li><router-link to="/profile/student/student-rank"><i class="icon icon-arrow-gray"></i> Student Rank</router-link></li>
                        </ul>
                      </li>
                      <li><strong>School Performance</strong>
                        <ul>
                          <li><router-link to="/school-performance/pmf-data/rate-me"><i class="icon icon-arrow-gray"></i> Current Year PMF</router-link></li>
                          <li><router-link to="/school-performance/pmf-data"><i class="icon icon-arrow-gray"></i> PMF Data Import/Export</router-link></li>
                          <li><router-link to="/school-performance/reports/barcontrol/current_equity"><i class="icon icon-arrow-gray"></i> Current Year Equity Report</router-link></li>
                          <li><router-link to="/school-performance/reports/barcontrol/prior_equity"><i class="icon icon-arrow-gray"></i> Prior Year Equity Report</router-link></li>
                        </ul>
                      </li>
                      <li><strong>Student Performance</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Student Profile</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Student Attendance Report</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> PMF Attendance Report</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Assesment Manager</a></li>
                        </ul>
                      </li>
                      <li><strong>Teacher Performance</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Lesson Plan</a></li>
                        </ul>
                      </li>
                    </ul>
                    <router-link to="/school-reports"><i class="icon icon-lesson"></i>School Reports</router-link>
                  </li>
                  <li>
                    <ul class="megamenu d-flex flex-nowrap">
                      <li><strong>Student</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Add Student</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Manage Students</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Attendance Entry</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Release Students</a></li>

                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Edit Entry/Exit Code</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Edit Student Discipline</a></li>
                        </ul>
                      </li>
                      <li><strong>Class</strong>
                        <ul>
                          <li><router-link to="/class-period"><i class="icon icon-arrow-gray"></i> Class Period Manage</router-link></li>
                          <li><router-link to="/manage-employee"><i class="icon icon-arrow-gray"></i> Manage Employee</router-link></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Re-assign Class</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Release Report</a></li>
                          <li><router-link to="/recurring-school-schedule"><i class="icon icon-arrow-gray"></i> Recurring Schedule</router-link></li>
                        </ul>
                      </li>
                      <li><strong>LMS</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Class Course List</a></li>
                        </ul>
                      </li>
                      <li><strong>Academic Calendar</strong></li>
                    </ul>
                    <router-link to="/manage"><i class="icon icon-box-layers"></i>Manage</router-link>
                  </li>
                </ul>
              </div>
              <!-- Main Menu-END -->
 </template>