//GO: PARITTY DISTRIBUTION

package main

import (
    "fmt"
)

func main() {
    var n int
    fmt.Scanf("%d", &n) // Read the number of elements (though we won't use it explicitly)

    var arr []int
    for i := 0; i < n; i++ {
        var num int
        fmt.Scanf("%d", &num) // Read each number
        arr = append(arr, num)
    }

    // Print odd numbers
    for _, num := range arr {
        if num%2 != 0 {
            fmt.Println(num)
        }
    }

    // Print even numbers
    for _, num := range arr {
        if num%2 == 0 {
            fmt.Println(num)
        }
    }
}

