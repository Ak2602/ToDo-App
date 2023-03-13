export let flag = new Boolean();
if (flag == false) {
  Boolean.valueOf((flag = "Pending"));
} else {
  Boolean.valueOf((flag = "Completed"));
}
