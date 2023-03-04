import csv


def set_schedule(records):

    dataDay=[]
    dataEnd=[]
    dataHol=[]
    for i in range(1, 76490):
        
        if records[i][1]=='0':
            prev_daykind= "WEENEND"
            dataEnd.append({
                "routeCode": records[i][2], "stopCode": records[i][3],"Hour":records[i][5], "Minute":records[i][6],"Day":  records[i][1]
            })
            dataHol.append({
                "routeCode": records[i][2], "stopCode": records[i][3],"Hour":records[i][5], "Minute":records[i][6],"Day":  records[i][1]
            })  
        elif records[i][1]=='6':
            prev_daykind= "WEENEND"
            dataEnd.append({
                "routeCode": records[i][2], "stopCode": records[i][3],"Hour":records[i][5], "Minute":records[i][6],"Day":  records[i][1]
            })  
        else:
            prev_daykind= "WEEKDAY"
            dataDay.append({
                "routeCode": records[i][2], "stopCode": records[i][3],"Hour":records[i][5], "Minute":records[i][6],"Day":  records[i][1]
            })
        

    downloadDay(dataDay)
    downloadEnd(dataEnd)
    downloadHol(dataHol)

def get_schedule(callback):
    with open("final_updated_schedule.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)

def downloadDay(data):
    # Open a file for writing
    with open('ScheduleAvgWeekday.csv', 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.DictWriter(csvfile, fieldnames=data[0].keys())
        
        # Write the header row
        writer.writeheader()
        
        # Write the data
        for row in data:
            writer.writerow(row)

def downloadEnd(data):
    # Open a file for writing
    with open('ScheduleAvgWeekend.csv', 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.DictWriter(csvfile, fieldnames=data[0].keys())
        
        # Write the header row
        writer.writeheader()
        
        # Write the data
        for row in data:
            writer.writerow(row)

def downloadHol(data):
    # Open a file for writing
    with open('ScheduleAvgHolidays.csv', 'w', newline='') as csvfile:
        # Create a writer object
        writer = csv.DictWriter(csvfile, fieldnames=data[0].keys())
        
        # Write the header row
        writer.writeheader()
        
        # Write the data
        for row in data:
            writer.writerow(row)


get_schedule(set_schedule)