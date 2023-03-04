import csv
#set_trips:  Adding days by compare the two file( trip and schedule) 
#setNewTrip: Creating 3 files based in day kind(realAvgHolidays...)  that contain the average time that the bus is in every stopCode
sc_routes=[]
sc_stops=[]
sc_hour=[]
sc_minutes=[]
day=[]
firstData = []

def set_schedule(records):
    
    for i in range(1, 76491):
        sc_routes.append(records[i][2])
        sc_stops.append(records[i][3])
        sc_hour.append(records[i][5])
        sc_minutes.append(records[i][6])
        day.append(records[i][1])
    get_trips(set_trips)

def get_schedule(callback):
    with open("final_updated_schedule.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)

def set_trips(records):
    
    routes=[]
    stops=[]
    hours = []
    minutes = []
    dictionary={}

    for i in range(1, 78154):
        time = records[i][9]
        substrings = time.split(":")

        routes.append(records[i][8])
        stops.append(records[i][4])
        hours.append(substrings[0])
        minutes.append(substrings[1])
        for j in range(1, 76490):
             if records[i][8]==sc_routes[j] and records[i][4]==sc_stops[j] and substrings[0]==sc_hour[j]:
                firstData.append({
                    "routeCode": records[i][8], "stopCode": records[i][4],"Hour":substrings[0], "Minute": substrings[1],"Day": day[j]
                })

    

def setNewTrip(newrecords):
    prev_route = newrecords[1][0]
    prev_stop = newrecords[1][1]
    prev_hour = newrecords[1][2]
    prev_daykind = "WEEKEND"
    dataDay=[]
    minutes = 0
    count =0
    avg =0

    dataEnd=[]
    minutesEnd = 0
    countEnd =0
    avgEnd =0
    
    dataHol=[]
    minutesHOL = 0
    countHol =0
    avgHol =0

    for i in range(1, len(newrecords)):
        if newrecords[i][0]==prev_route and newrecords[i][1]==prev_stop and newrecords[i][2]==prev_hour and (int(newrecords[i][4])!=0) or (int(newrecords[i][4])!=6):
            count +=1
            minutes += int(newrecords[i][3])
            prev_daykind= "WEEKDAY"
        else:
            if prev_daykind == "WEEKDAY":
                if count > 0 :
                    avg = minutes / count
                    dataDay.append({
                        "routeCode":prev_route, "stopCode": prev_stop,"Hour":prev_hour, "Minute":int(avg),"Day": prev_daykind
                    })
                    # update variables
                    prev_route = newrecords[i][0]
                    prev_stop = newrecords[i][1]
                    prev_hour = newrecords[i][2]
                    minutes = 0
                    count = 0
                    avg = 0       

    for i in range(1, len(newrecords)):
        if newrecords[i][0]==prev_route and newrecords[i][1]==prev_stop and newrecords[i][2]==prev_hour and (int(newrecords[i][4])==0) or (int(newrecords[i][4])==6):
            
            countEnd +=1
            minutesEnd += int(newrecords[i][3])
            prev_daykind= "WEEKEND"

        #brika kati kainourgio
        else:
            if prev_daykind == "WEEKEND":
                if countEnd>0:
                    avgEnd = minutesEnd / countEnd
                    dataEnd.append({
                        "routeCode":prev_route, "stopCode": prev_stop,"Hour":prev_hour, "Minute":int(avgEnd),"Day": prev_daykind
                    })
                    dataHol.append({
                        "routeCode":prev_route, "stopCode": prev_stop,"Hour":prev_hour, "Minute":int(avgEnd),"Day": "HOLIDAY"
                    })
                    # update variables
                    prev_route = newrecords[i][0]
                    prev_stop = newrecords[i][1]
                    prev_hour = newrecords[i][2]
                    minutesEnd = 0
                    countEnd = 0
                    avgEnd = 0
   
    for i in range(1, len(newrecords)):
        if newrecords[i][0]==prev_route and newrecords[i][1]==prev_stop and newrecords[i][2]==prev_hour and ((int(newrecords[i][4])==0)==True):
            
            countHol +=1
            minutesHOL += int(newrecords[i][3])
            prev_daykind= "HOLIDAY"

        #brika kati kainourgio
        else:
            if prev_daykind == "HOLIDAY":
                if countEnd>0:
                    avgHol = minutesEnd / countEnd
                    dataHol.append({
                        "routeCode":prev_route, "stopCode": prev_stop,"Hour":prev_hour, "Minute":int(avgHol),"Day": prev_daykind
                    })
                    # update variables
                    prev_route = newrecords[i][0]
                    prev_stop = newrecords[i][1]
                    prev_hour = newrecords[i][2]
                    minutesHOL = 0
                    countHol = 0
                    avgHol = 0                    
            
            

    downloadDay(dataDay)
    downloadEnd(dataEnd)
    downloadHol(dataHol)

def getNewTrip(callback):
    with open("newTrips.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)

def get_trips(callback):
    with open("trips.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)
        

def downloadDay(data):
    # Open a file for writing
    with open('realAvgWeekday.csv', 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.DictWriter(csvfile, fieldnames=data[0].keys())
        
        # Write the header row
        writer.writeheader()
        
        # Write the data
        for row in data:
            writer.writerow(row)

def downloadEnd(data):
    # Open a file for writing
    with open('realAvgWeekend.csv', 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.DictWriter(csvfile, fieldnames=data[0].keys())
        
        # Write the header row
        writer.writeheader()
        
        # Write the data
        for row in data:
            writer.writerow(row)

def downloadHol(data):
    # Open a file for writing
    with open('realAvgHolidays.csv', 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.DictWriter(csvfile, fieldnames=data[0].keys())
        
        # Write the header row
        writer.writeheader()
        
        # Write the data
        for row in data:
            writer.writerow(row)
        

#get_schedule(set_schedule)
getNewTrip(setNewTrip)
