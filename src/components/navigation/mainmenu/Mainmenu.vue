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
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Manage Template</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Notification Email List</a></li>
                        </ul>
                      </li>
                      <li><strong>Project Commit</strong></li>
                    </ul>
                    <router-link to="/settings"><i class="icon icon-profile"></i>Settings</router-link>
                  </li>
                  <li>
                    <ul class="megamenu d-flex flex-nowrap">
                      <li><strong>General Reports</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Student List</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Staff List</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Withdrawn Student List</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Student Rank</a></li>
                        </ul>
                      </li>
                      <li><strong>School Performance</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Current Year PMF</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> PMF Data Import/Export</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Current Year Equity Report</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Prior Year Equity Report</a></li>
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
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Add Studentt</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Manage Students</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Attendance Entry</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Release Students</a></li>

                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Edit Entry/Exit Code</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Edit Student Discipline</a></li>
                        </ul>
                      </li>
                      <li><strong>Class</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Class Period Manage</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Manage Employee</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Re-assign Class</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Release Report</a></li>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Recurring Schedule</a></li>
                        </ul>
                      </li>
                      <li><strong>LMS</strong>
                        <ul>
                          <li><a href="#"><i class="icon icon-arrow-gray"></i> Class Course List</a></li>
                        </ul>
                      </li>
                      <li><strong>Academic Calendar</strong></li>
                    </ul>
                    <router-link to="/manage"><i class="icon icon-lesson"></i>Manage</router-link>
                  </li>
                </ul>
              </div>
              <!-- Main Menu-END -->
 </template> 