# Testing & Debugging Runbook (Fast Feedback Loop)

Hướng dẫn quy trình kiểm thử và vòng lặp gỡ lỗi (debug & fix loop) nhanh từ local cho ứng dụng Now SDK Fluent, không phụ thuộc vào giao diện web của instance hay full CI pipeline.

---

## 1. Chiến lược kiểm thử 2 tầng (Two-Tier Testing Strategy)

| Tầng | Phạm vi | Lệnh | Thời gian | Khi nào nên dùng? |
|---|---|---|---|---|
| **Tier 1: Local Unit Test** | Logic nghiệp vụ thuần, policies, validations, state transitions (`src/server/*.ts`) | `pnpm test` | ~120ms | Chạy liên tục khi đang code logic nghiệp vụ tại local; không cần mạng/instance. |
| **Tier 2: Instance ATF Suite** | Toàn bộ integration, ACLs, Business Rules, DB constraints trên ServiceNow | `pnpm test:atf` | 30s – 2m | Chạy sau khi deploy code lên instance hoặc trước khi mở PR/merge code. |
| **Tier 2b: Single ATF Test** | Chạy riêng lẻ 1 test case trên instance để cô lập lỗi | `npx now-sdk cicd test run -a pdi-kl-o2 --test-name "<name>"` | 10s – 30s | Dùng trong vòng lặp debug/fix 1 lỗi cụ thể mà không cần chạy lại cả suite. |

---

## 2. Tiêu chí chọn loại test

1. **Dùng Unit Test (`pnpm test`) khi**:
   - Viết hoặc sửa đổi logic tính điểm (`recalculate-submission-score.ts`), chuyển trạng thái duyệt (`submission-policy.ts`), kiểm tra điều kiện gate (`take-pm-gate.ts`, `take-coe-gate.ts`).
   - Kiểm tra các hàm thuần (pure functions) không phụ thuộc vào `GlideRecord` hay session HTTP.

2. **Dùng ATF Suite (`pnpm test:atf`) khi**:
   - Kiểm tra quyền truy cập bảng (ACL query isolation, role checks).
   - Kiểm tra Business Rule trước/sau khi insert/update/delete thực tế trên database (cascade delete, lock immutability).
   - Sau khi thực hiện `pnpm deploy` (hoặc `now-sdk install`) để nghiệm thu toàn diện ứng dụng.

3. **Dùng Single ATF Test (`now-sdk cicd test run`) khi**:
   - Suite báo lỗi ở 1 test cụ thể (ví dụ `"Submission - Gate Progression"`).
   - Cần debug nhanh và lặp lại nhiều lần trên test đó cho đến khi pass.

---

## 3. Fast Feedback Loop (Vòng lặp Debug & Fix từ Local)

Fast Feedback Loop giúp developer rút ngắn chu kỳ sửa lỗi từ vài phút (chờ full CI pipeline hoặc mở giao diện instance thủ công) xuống chỉ còn vài chục giây bằng cách cô lập lỗi và thực thi hoàn toàn từ terminal.

```
[1. pnpm test:atf]
        │
   (Thất bại?) ──► [2. Lấy result-id từ output]
                            │
                            ▼
                 [3. Tra cứu log lỗi chi tiết qua CLI]
                     now-sdk cicd testsuite result --result-id <id> -a pdi-kl-o2
                     now-sdk cicd test logs --result-id <test_res_id> -a pdi-kl-o2
                            │
                            ▼
                 [4. Sửa code tại src/server/*.ts hoặc src/fluent/*.now.ts]
                            │
                            ▼
                 [5. Xác thực unit test local: pnpm test]
                            │
                            ▼
                 [6. Deploy bản vá lên instance: pnpm deploy]
                            │
                            ▼
                 [7. Chạy lại riêng test đó: now-sdk cicd test run]
                            │
                      (Pass test đó?)
                       ├── Chưa ──► Quay lại bước 4
                       └── Rồi  ──► [8. Chạy lại toàn bộ suite: pnpm test:atf]
```

### Chi tiết 8 bước thực thi:

1. **Chạy toàn bộ Suite**:
   ```bash
   pnpm test:atf
   ```
   Nếu test suite fail, command sẽ exit code khác 0 và in ra `result-id` (sys_id của kết quả run).

2. **Lấy `result-id`**:
   Copy giá trị `result-id` từ terminal output của bước 1.

3. **Tra cứu chi tiết lỗi và logs của test case bị hỏng**:
   ```bash
   # Xem danh sách test con trong suite và sys_id của test bị fail:
   npx now-sdk cicd testsuite result --result-id <result-id> -a pdi-kl-o2

   # Lấy log chi tiết của test hỏng (thay <test-result-id> từ output trên):
   npx now-sdk cicd test logs --result-id <test-result-id> -a pdi-kl-o2
   ```

4. **Sửa code tại local**:
   - Lỗi logic server: sửa trong `src/server/*.ts`.
   - Lỗi cấu hình metadata/ACLs/Business Rules: sửa trong `src/fluent/*.now.ts`.

5. **Kiểm tra Unit Test local**:
   ```bash
   pnpm test
   ```
   Đảm bảo các kiểm thử logic thuần không bị phá vỡ (~120ms).

6. **Deploy bản sửa lên instance**:
   ```bash
   pnpm deploy
   ```
   Build và cài đặt bản vá trực tiếp lên PDI/Test instance (`now-sdk install -a pdi-kl-o2`).

7. **Chạy lại riêng lẻ test case bị hỏng (Tối ưu tốc độ lặp)**:
   Không cần chạy lại toàn bộ suite, chỉ chạy đúng test đang debug:
   ```bash
   npx now-sdk cicd test run -a pdi-kl-o2 --test-name "Submission - Gate Progression"
   ```
   Nếu chưa pass, tiếp tục lặp lại các bước 4–7.

8. **Nghiệm thu toàn bộ Suite**:
   Khi test đơn lẻ đã pass, chạy lại toàn bộ suite để đảm bảo không phát sinh lỗi hồi quy (regression):
   ```bash
   pnpm test:atf
   ```
