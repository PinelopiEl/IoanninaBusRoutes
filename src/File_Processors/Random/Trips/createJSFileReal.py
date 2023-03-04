import csv
# Print data of real time for day kind WEEKDAY to create JS file
# with format real_first[routevode_stopcode_hour] = time

#Weekday
def set_real(records):
    data = []
    for i in range(1, len(records)):
        mystr = "real_first[{}_{}_{}]='{}:{}';".format(records[i][0], records[i][1],records[i][2],records[i][2],records[i][3])
        data.append(mystr)
    for i in data:
        print(i+"\n")
    

def get_real(callback):
    with open("realAvgWeekday.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)

#get_real(set_real)

#Weekend
data = []
def set_realEnd(records):
    
    for i in range(1, len(records)):
        mystr = "real_first[{}_{}_{}]='{}:{}';".format(records[i][0], records[i][1],records[i][2],records[i][2],records[i][3])
        data.append(mystr)
    var = "var sched_first = {};"
    with open('list_data.js', 'w') as outfile:
            outfile.write(var)
            for i in data:
                # Write the JSON value here
                outfile.write(i+"\n")
    

def get_realEnd(callback):
    with open("realAvgWeekend.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)
#get_realEnd(set_realEnd)

#Weekend
newdata = []
def set_realhol(records):
    
    for i in range(1, len(records)):
        mystr = "real_first[{}_{}_{}]='{}:{}';".format(records[i][0], records[i][1],records[i][2],records[i][2],records[i][3])
        newdata.append(mystr)
    var = "var sched_first = {};"
    with open('RealTimeHolidays.js', 'w') as outfile:
            outfile.write(var)
            for i in newdata:
                # Write the JSON value here
                outfile.write(i+"\n")
    

def get_realhol(callback):
    with open("realAvgHolidays.csv", 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
        callback(data)
#get_realhol(set_realhol)