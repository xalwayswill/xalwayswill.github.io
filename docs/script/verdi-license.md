```
#include <iostream>
#include <fstream>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char *argv[])
{
  int done = 0;
  int inter = atoi(argv[1]);
  char * cmd = strcat(argv[2], ">lic.log&");
  std::cout << "begin to push lic req per " << inter << " s\n";
  std::fstream fin;
  while(1)
  {
    std::cout << "begin to check\n";
    done = 1;
    fin.open("lic.log", std::fstream::in | std::fstream::out | std::fstream::trunc);
    //std::cout << system("make verdi > lic.log &") << std::endl;  //make can't be used
    std::cout << system(cmd) << std::endl;  //make can't be used
    usleep(inter * 1000000);
    std::string str;
    while(fin >> str)
    {
      std::cout << str << " ";
      std::size_t found = str.find("ERROR");
      if(found != std::string::npos)
      {
        done = 0;
        break; 
      }
    }
    std::cout << std::endl;
    if(done == 1) break;
    fin.close();
    int inter2 = 5;
    if(inter2 <= 5)
      inter2 = 5;
    else inter2 = 5 + inter2 - inter;
    usleep(inter2 * 1000000);
  }
return 0;
}
```
