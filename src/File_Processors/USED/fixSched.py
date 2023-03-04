import csv

def set_schedule(records):
    data_avg = []
    global prev_hour
    global prev_min
    global prev_stop
    global prev_route
    global prev_day
    global prev_time
    
    
    prev_hour = int(records[1][6])
    prev_min = int(records[1][7])
    prev_stop = records[1][3]
    prev_route = records[1][2]
    prev_day = int(records[1][1])
    prev_time = records[1][5]
    data_avg.append({
        "id": records[1][0], "day": records[1][1], "routeCode": records[1][2], "stopCode": records[1][3],
        "line": records[1][4], "tripTimeHour": records[1][6], "tripTimeMinute": records[1][7]
    })

    for i in range(2, 76490):


        if records[i][3] != prev_stop and records[i][2] == prev_route and int(records[i][1]) == prev_day:
           
            if prev_route=="0105" and records[i][3]=="161" and prev_day==6:
                print(str(prev_hour)+'_______'+str(prev_min)+'\n')
                print(records[i][6]+'_______'+records[i][7]+'\n')  
       

              
            if int(records[i][6])== prev_hour and int(records[i][7])==prev_min:
             

              
                    if prev_min + 1 <= 59:
    
      
                        prev_min = prev_min + 1
                        data_avg.append({
                            "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2], "stopCode": records[i][3],
                            "line": records[i][4], "tripTimeHour": prev_hour, "tripTimeMinute": prev_min
                        })
                        prev_hour = int(records[i][6])
                        
                        prev_stop = records[i][3]
                        prev_route = records[i][2]
                        prev_day = int(records[i][1])
                        prev_time = records[i][5]
                    else:
                        if 0 <= int(records[i][6]) < 23:
                            prev_hour = int(records[i][6]) + 1
                            prev_min = 0
                            
                            data_avg.append({
                                "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2],
                                "stopCode": records[i][3], "line": records[i][4], "tripTimeHour":prev_hour, "tripTimeMinute": prev_min
                            })
                            prev_hour =int(records[i][6])
                            
                            prev_stop = records[i][3]
                            prev_route = records[i][2]
                            prev_day = int(records[i][1])
                            prev_time = records[i][5]
                        elif int(records[i][6]) == 23:
                            prev_min = 0
                            prev_hour= 0
                            data_avg.append({
                                "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2],
                                "stopCode": records[i][3], "line": records[i][4], "tripTimeHour": prev_hour, "tripTimeMinute": prev_min
                            })
                            prev_stop = records[i][3]
                            prev_route = records[i][2]
                            prev_day = int(records[i][1])
                            prev_time = records[i][5]
            elif int(records[i][6]) == prev_hour:
                if int(records[i][7]) < prev_min:
                    if prev_min + 1 <= 59:
                        prev_min = prev_min + 1
                        prev_hour = int(records[i][6])
                        data_avg.append({
                            "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2],
                            "stopCode": records[i][3], "line": records[i][4], "tripTimeHour": prev_hour,
                            "tripTimeMinute": prev_min
                        })

                        prev_stop = records[i][3]
                        prev_route = records[i][2]
                        prev_day = int(records[i][1])
                        prev_time = records[i][5]
                    else:
                        if (int(records[i][6]) < 23 or int(records[i][6]) >= 0):
                            prev_hour= prev_hour + 1
                            prev_min = 0
                            data_avg.append({
                                "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2], "stopCode": records[i][3], "line": records[i][4], "tripTimeHour": prev_hour, "tripTimeMinute": prev_min
                            })
                            
                            prev_stop = records[i][3]
                            prev_route = records[i][2]
                            prev_day = int(records[i][1])
                            prev_time = records[i][5]
                        elif (int(records[i][6]) == 23):
                            prev_hour=0
                            prev_min=0
                            records[i][6] = 0
                            data_avg.append({
                                "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2], "stopCode": records[i][3], "line": records[i][4], "tripTimeHour": prev_hour, "tripTimeMinute": prev_min
                            })
                            prev_stop = records[i][3]
                            prev_route = records[i][2]
                            prev_day = int(records[i][1])
                            prev_time = records[i][5]
                          
                else:

                    prev_min=prev_min+1
                    prev_hour = int(records[i][6])
                    data_avg.append({
                        "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2], "stopCode": records[i][3], "line": records[i][4], "tripTimeHour": prev_hour, "tripTimeMinute": prev_min
                    })
                    
                    prev_stop = records[i][3]
                    prev_route = records[i][2]
                    prev_day = int(records[i][1])
                    prev_time = records[i][5]
            elif (int(records[i][6]) == prev_hour - 1):
                prev_min = prev_min+1
                prev_hour = prev_hour
                data_avg.append({
                        "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2], "stopCode": records[i][3], "line": records[i][4], "tripTimeHour": prev_hour, "tripTimeMinute": prev_min
                })
                
                
                prev_stop = records[i][3]
                prev_route = records[i][2]
                prev_day = int(records[i][1])
                prev_time = records[i][5]
            elif int(records[i][6])!=prev_hour and int(records[i][7])!=prev_min:
                prev_hour = int(records[i][6])
                prev_min = int(records[i][7])
                data_avg.append({
                        "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2], "stopCode": records[i][3], "line": records[i][4], "tripTimeHour": prev_hour, "tripTimeMinute": prev_min
                })

                prev_stop = records[i][3]
                prev_route = records[i][2]
                prev_day = int(records[i][1])
                prev_time = records[i][5]
        else :
                    
            prev_hour = int(records[i][6])
            prev_min = int(records[i][7])
            data_avg.append({
                "id": records[i][0], "day": int(records[i][1]), "routeCode": records[i][2], "stopCode": records[i][3], "line": records[i][4], "tripTimeHour":prev_hour, "tripTimeMinute": prev_min
            })

            prev_stop = records[i][3]
            prev_route = records[i][2]
            prev_day = int(records[i][1])
            prev_time = records[i][5]


    
    
    download(data_avg)
    
def download(data_avg):
    # Open a file for writing
    with open('data_avg2.csv', 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.DictWriter(csvfile, fieldnames=data_avg[0].keys())
        
        # Write the header row
        writer.writeheader()
        
        # Write the data
        for row in data_avg:
            writer.writerow(row)

def get_schedule(callback):
    with open("schedule.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)
        
        
get_schedule(set_schedule)