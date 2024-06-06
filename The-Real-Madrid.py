# You are using Python
n=int(input())
l=list(map(int,input().split()))
for i in l:
    if l.count(i)==2:
        x=i
        break
sum1=n*(n+1)//2
num=sum(l)
num-=x
num=sum1-num
print(f"The missing jersey number is {num} and the duplicate number is {x}")
