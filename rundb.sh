#!/bin/bash
SNAPSHOTS=`aws rds describe-db-cluster-snapshots --db-cluster-identifier rankmi-prod-cluster`
ARRAYSNAPSHOTS=$(echo $SNAPSHOTS | jq '."DBClusterSnapshots"')
DATA=$(echo $ARRAYSNAPSHOTS | jq '.[].SnapshotCreateTime')

counter=0
position=0
for date in $DATA
do

    date=${date:1:24}
    # date format [YYYY.]MM.DD-hh:mm[:ss]
    date=${date:0:4}.${date:5:2}.${date:8:2}-${date:11:2}:${date:14:2}:${date:17:2}
    date=$(date -d $date +%s)
    if [ -z "${greaderDate}" ];
    then
        greaderDate=$date
        position=$counter
    else
        if [ ${date} -ge ${greaderDate} ];
        then
            greaderDate=$date
            position=$counter
        fi
    fi
    ((counter++))
done

ARRAYSNAPSHOTS=$(echo $SNAPSHOTS | jq '."DBClusterSnapshots"')
DATA=$(echo $ARRAYSNAPSHOTS | jq '.['$position'].DBClusterSnapshotIdentifier')
DATA=${DATA:1:40}

echo "Snaphost utilizado"
echo $DATA

aws rds restore-db-cluster-from-snapshot --db-cluster-identifier temporal-db-testing-cluster --snapshot-identifier $DATA --engine aurora-postgresql --engine-version 9.6.12 --vpc-security-group-ids sg-02102d136d03d8c52
aws rds create-db-instance --db-instance-identifier temporal-db-testing --db-cluster-identifier temporal-db-testing-cluster --db-instance-class "db.r4.large" --publicly-accessible --engine aurora-postgresql