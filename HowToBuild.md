dateObject: moment(),

1. Show year
   dateObject.format("Y")

2. show number days in month in
   dateObject.daysInMonth();

3. Currenday
   dateObject.format("D")

4. Day of week 0...1..5...6:
   let firstDay = moment(dateObject).startOf("month").format("d");

5. show Month

dateObject.format("MMMM");

6. show all month
   allmonths: moment.months(),
