 ```
# Prints the location of error in case of an exception
def printErrorLocation(e):
	print("The error message received is shown below. Please fix the error and try again:")
	print("\t%s\n" % str(e))
	print("Error location \n")
	for frame in traceback.extract_tb(sys.exc_info()[2]):
		fname, lineno, fn, text = frame
		print("Error in %s on line %d in function = '%s' and the text = '%s'\n" % (fname, lineno, fn, text))
```
