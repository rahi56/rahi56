n=int(input())
a=list(map(int,input().split()))
b=list(map(int,input().split()))
steps=0
while min(a)>=0:
   m=min(a)
   for i in range(n):
     if a[i]!=m:
       a[i]-=b[i]
       steps+=1
   if len(set(a))==1:
    print(steps)
    break
else :
  print("-1")