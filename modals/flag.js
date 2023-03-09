export let flag = new Boolean(false);
if (flag == false) {
  Boolean.valueOf((flag = "Pending"));
} else {
  Boolean.valueOf((flag = "Completed"));
}
