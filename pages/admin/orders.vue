<template>
  <div>
    <h1>Order Page</h1>

    <div class="buttons-container">
      <button @click="navigateTo('/admin/')">Go to Category Page</button>
      <button @click="navigateTo('/admin/product')">Go to Product Page</button>
    </div>

    <div class="order-page-column">
      <h2>Active order list</h2>
      <div>
        <h3>Pending:</h3>
        <table>
          <thead>
          <tr>
            <td v-for="item in orderMenu" :key="item">
              {{ item }}
            </td>
          </tr>
          </thead>
          <tbody>

          <template v-for="(order, index) in pendingOrders" :key="order._id">
            <tr v-for="(item, itemIndex) in order.items" :key="item._id">
              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ index + 1 }}.
              </td>

              <td>{{ item.product.title }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }} ₽</td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order.totalPrice.toLocaleString('ru-RU') }} ₽
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                <select
                    v-model="order.status"
                    :disabled="order.status === 'delivered'"
                    @change="updateOrderStatus(order)"
                >
                  <option
                      v-for="status in orderStatus"
                      :key="status"
                      :value="status"
                      :disabled="isStatusDisabled(order.status, status)"
                  >
                    {{ status }}
                  </option>
                </select>
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order.user }}
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order._id }}
              </td>
              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ new Date(order.createdAt).toLocaleString('ru-RU') }}
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Shipped: </h3>
        <table>
          <thead>
          <tr>
            <td v-for="item in orderMenu" :key="item">
              {{ item }}
            </td>
          </tr>
          </thead>
          <tbody>

          <template v-for="(order, index) in shippedOrders" :key="order._id">
            <tr v-for="(item, itemIndex) in order.items" :key="item._id">
              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ index + 1 }}.
              </td>

              <td>{{ item.product.title }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }} ₽</td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order.totalPrice.toLocaleString('ru-RU') }} ₽
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                <select
                    v-model="order.status"
                    :disabled="order.status === 'delivered'"
                    @change="updateOrderStatus(order)"
                >
                  <option
                      v-for="status in orderStatus"
                      :key="status"
                      :value="status"
                      :disabled="isStatusDisabled(order.status, status)"
                  >
                    {{ status }}
                  </option>
                </select>
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order.user }}
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order._id }}
              </td>
              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ new Date(order.createdAt).toLocaleString('ru-RU') }}
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>

      <div>
        <h3>Delivered:</h3>
        <table>
          <thead>
          <tr>
            <td v-for="item in orderMenu" :key="item">
              {{ item }}
            </td>
          </tr>
          </thead>
          <tbody>

          <template v-for="(order, index) in deliveredOrders" :key="order._id">
            <tr v-for="(item, itemIndex) in order.items" :key="item._id">
              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ index + 1 }}.
              </td>

              <td>{{ item.product.title }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }} ₽</td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order.totalPrice.toLocaleString('ru-RU') }} ₽
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                <select
                    v-model="order.status"
                    :disabled="order.status === 'delivered'"
                    @change="updateOrderStatus(order)"
                >
                  <option
                      v-for="status in orderStatus"
                      :key="status"
                      :value="status"
                      :disabled="isStatusDisabled(order.status, status)"
                  >
                    {{ status }}
                  </option>
                </select>
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order.user }}
              </td>

              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ order._id }}
              </td>
              <td v-if="itemIndex === 0" :rowspan="order.items.length">
                {{ new Date(order.createdAt).toLocaleString('ru-RU') }}
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import type {IOrder} from "~/types/catalog";

const orderMenu = ['#','Title', 'Quantity', 'Price', 'Total price', 'Status','Buyer', '_id', 'Created at']

const pendingOrders = ref<IOrder[]>([])
const shippedOrders = ref<IOrder[]>([])
const deliveredOrders = ref<IOrder[]>([])

const orderStatus = ['pending', 'shipped', 'delivered']

const isStatusDisabled = (currentStatus: string, targetStatus: string) => {
  if (currentStatus === 'delivered') return true
  const currentIndex = orderStatus.indexOf(currentStatus)
  const targetIndex = orderStatus.indexOf(targetStatus)
  return targetIndex < currentIndex
}

const updateOrderStatus = async (order: IOrder) => {
  try {
    await axios.patch(`/api/orders/${order._id}/status`, {
      status: order.status,
    })

    await requestOrders()
  } catch (error) {
    console.error('Failed to update order status:', error)
  }
}

const requestOrders = async () => {
  try {
    const [pendingRes, shippedRes, deliveredRes] = await Promise.all([
      axios.get('/api/orders/by-status?status=pending'),
      axios.get('/api/orders/by-status?status=shipped'),
      axios.get('/api/orders/by-status?status=delivered'),
    ])

    pendingOrders.value = pendingRes.data
    shippedOrders.value = shippedRes.data
    deliveredOrders.value = deliveredRes.data
  } catch (error) {
    console.error('Error loading orders:', error)
  }
}

onMounted(requestOrders)
</script>

<style scoped lang="scss">
.order-page-column {
  margin-top: 24px;

  h2 {
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 600;
  }

  h3 {
    margin: 20px 0 10px;
    font-size: 20px;
    font-weight: 500;
    color: #444;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 32px;
    font-size: 14px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    overflow: hidden;

    thead {
      background-color: #f7f9fc;

      tr {
        td {
          font-weight: 600;
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
      }
    }

    tbody {
      tr {
        transition: background-color 0.2s;

        &:nth-child(even) {
          background-color: #f9fafb;
        }

        &:hover {
          background-color: #f1f5f9;
        }

        td {
          padding: 10px 12px;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: middle;
        }

        select {
          padding: 6px 10px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
          background-color: #fff;
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.2s;

          &:disabled {
            background-color: #e5e7eb;
            cursor: not-allowed;
          }

          &:focus {
            outline: none;
            border-color: #3b82f6;
          }
        }
      }
    }
  }
}

.buttons-container {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;

  button {
    background-color: #3b82f6;
    color: #fff;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2563eb;
    }
  }
}
</style>