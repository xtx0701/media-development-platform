// 计算用户经验值
export function countUserLevel(num) {
        const Number = parseInt(num / 100);
        return new Promise((resolve, reject) => {
                if (Number >= 0 && Number < 5) {
                        resolve([5, 0, '自媒体小白+','自媒体小白++']);
                        return;
                } else if (Number >= 2 && Number < 15) {
                        resolve([15, 5, '自媒体小白++','自媒体菜鸟+']);
                        return;
                } else if (Number >= 15 && Number < 25) {
                        resolve([25, 15, '自媒体菜鸟+','自媒体菜鸟++']);
                        return;
                } else if (Number >= 25 && Number < 40) {
                        resolve([40, 25, '自媒体菜鸟++','自媒体高手+']);
                        return;
                } else if (Number >= 40 && Number < 60) {
                        resolve([60, 40, '自媒体高手+','自媒体高手++']);
                        return;
                } else if (Number >= 0 && Number < 5) {
                        resolve([90, 60, '自媒体高手++','自媒体达人+']);
                        return;
                } else if (Number >= 0 && Number < 5) {
                        resolve([110, 90, '自媒体达人+','自媒体达人++']);
                        return;
                } else if (Number >= 0 && Number < 5) {
                        resolve([150, 110, '自媒体达人++','自媒体宗师']);
                        return;
                } else if (Number >= 0 && Number < 5) {
                        resolve([99999, 150, '自媒体宗师','登峰造极']);
                        return;
                } else {
                        reject('发生错误');
                }
        })
}
