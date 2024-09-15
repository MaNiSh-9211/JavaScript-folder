#include <stdio.h>
#include <stdint.h>
#include <string.h>

#define CHUNK_SIZE 64
#define TOTAL_LEN_LEN 8

static const uint32_t k[] = {
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
};

struct buffer_state {
    const uint8_t *p;
    size_t len;
    size_t total_len;
    int single_one_delivered;
    int total_len_delivered;
};

static inline uint32_t right_rot(uint32_t value, unsigned int count)
{
    return value >> count | value << (32 - count);
}

static void init_buf_state(struct buffer_state *state, const void *input, size_t len)
{
    state->p = input;
    state->len = len;
    state->total_len = len;
    state->single_one_delivered = 0;
    state->total_len_delivered = 0;
}

static int calc_chunk(uint8_t chunk[CHUNK_SIZE], struct buffer_state *state)
{
    size_t space_in_chunk;

    if (state->total_len_delivered) {
        return 0;
    }

    if (state->len >= CHUNK_SIZE) {
        memcpy(chunk, state->p, CHUNK_SIZE);
        state->p += CHUNK_SIZE;
        state->len -= CHUNK_SIZE;
        return 1;
    }

    memcpy(chunk, state->p, state->len);
    chunk += state->len;
    space_in_chunk = CHUNK_SIZE - state->len;
    state->p += state->len;
    state->len = 0;

    if (!state->single_one_delivered) {
        *chunk++ = 0x80;
        space_in_chunk -= 1;
        state->single_one_delivered = 1;
    }

    if (space_in_chunk >= TOTAL_LEN_LEN) {
        const size_t left = space_in_chunk - TOTAL_LEN_LEN;
        const size_t len = state->total_len * 8;
        memset(chunk, 0x00, left);
        chunk += left;

        chunk[0] = (uint8_t)(len >> 56);
        chunk[1] = (uint8_t)(len >> 48);
        chunk[2] = (uint8_t)(len >> 40);
        chunk[3] = (uint8_t)(len >> 32);
        chunk[4] = (uint8_t)(len >> 24);
        chunk[5] = (uint8_t)(len >> 16);
        chunk[6] = (uint8_t)(len >> 8);
        chunk[7] = (uint8_t)len;

        state->total_len_delivered = 1;
    } else {
        memset(chunk, 0x00, space_in_chunk);
    }

    return 1;
}

void calc_sha_256(uint8_t hash[32], const void *input, size_t len)
{
    uint32_t h0 = 0x6a09e667;
    uint32_t h1 = 0xbb67ae85;
    uint32_t h2 = 0x3c6ef372;
    uint32_t h3 = 0xa54ff53a;
    uint32_t h4 = 0x510e527f;
    uint32_t h5 = 0x9b05688c;
    uint32_t h6 = 0x1f83d9ab;
    uint32_t h7 = 0x5be0cd19;

    uint8_t chunk[64];

    struct buffer_state state;

    init_buf_state(&state, input, len);

    while (calc_chunk(chunk, &state)) {
        uint32_t a, b, c, d, e, f, g, h;
        uint32_t w[64];
        const uint8_t *p = chunk;
        int i;

        memset(w, 0x00, sizeof w);
        for (i = 0; i < 16; i++) {
            w[i] = (uint32_t)p[0] << 24 | (uint32_t)p[1] << 16 |
                (uint32_t)p[2] << 8 | (uint32_t)p[3];
            p += 4;
        }

       for (i = 16; i < 64; i++) {
    const uint32_t s0 = right_rot(w[i - 15], 7) ^ right_rot(w[i - 15], 18) ^ (w[i - 15] >> 3);
    const uint32_t s1 = right_rot(w[i - 2], 17) ^ right_rot(w[i - 2], 19) ^ (w[i - 2] >> 10);
    w[i] = w[i - 16] + s0 + w[i - 7] + s1;
}


        a = h0;
        b = h1;
        c = h2;
        d = h3;
        e = h4;
        f = h5;
        g = h6;
        h = h7;

        for (i = 0; i < 64; i++) {
            const uint32_t s1 = right_rot(e, 6) ^ right_rot(e, 11) ^ right_rot(e, 25);
            const uint32_t ch = (e & f) ^ (~e & g);
            const uint32_t temp1 = h + s1 + ch + k[i] + w[i];
            const uint32_t s0 = right_rot(a, 2) ^ right_rot(a, 13) ^ right_rot(a, 22);
            const uint32_t maj = (a & b) ^ (a & c) ^ (b & c);
            const uint32_t temp2 = s0 + maj;

            h = g;
            g = f;
            f = e;
            e = d + temp1;
            d = c;
            c = b;
            b = a;
            a = temp1 + temp2;
        }

        h0 += a;
        h1 += b;
        h2 += c;
        h3 += d;
        h4 += e;
        h5 += f;
        h6 += g;
        h7 += h;
    }

    hash[0] = (uint8_t)(h0 >> 24);
    hash[1] = (uint8_t)(h0 >> 16);
    hash[2] = (uint8_t)(h0 >> 8);
    hash[3] = (uint8_t)h0;
    hash[4] = (uint8_t)(h1 >> 24);
    hash[5] = (uint8_t)(h1 >> 16);
    hash[6] = (uint8_t)(h1 >> 8);
    hash[7] = (uint8_t)h1;
    hash[8] = (uint8_t)(h2 >> 24);
    hash[9] = (uint8_t)(h2 >> 16);
    hash[10] = (uint8_t)(h2 >> 8);
    hash[11] = (uint8_t)h2;
    hash[12] = (uint8_t)(h3 >> 24);
    hash[13] = (uint8_t)(h3 >> 16);
    hash[14] = (uint8_t)(h3 >> 8);
    hash[15] = (uint8_t)h3;
    hash[16] = (uint8_t)(h4 >> 24);
    hash[17] = (uint8_t)(h4 >> 16);
    hash[18] = (uint8_t)(h4 >> 8);
    hash[19] = (uint8_t)h4;
    hash[20] = (uint8_t)(h5 >> 24);
    hash[21] = (uint8_t)(h5 >> 16);
    hash[22] = (uint8_t)(h5 >> 8);
    hash[23] = (uint8_t)h5;
    hash[24] = (uint8_t)(h6 >> 24);
    hash[25] = (uint8_t)(h6 >> 16);
    hash[26] = (uint8_t)(h6 >> 8);
    hash[27] = (uint8_t)h6;
    hash[28] = (uint8_t)(h7 >> 24);
    hash[29] = (uint8_t)(h7 >> 16);
    hash[30] = (uint8_t)(h7 >> 8);
    hash[31] = (uint8_t)h7;
}
int main() {
    const char input[] = "Hello, world!";
    uint8_t hash[32];

    // Calculate the SHA-256 hash
    calc_sha_256(hash, input, strlen(input));

    // Print the hash value
    printf("SHA-256 hash: ");
    for (int i = 0; i < 32; i++) {
        printf("%02x", hash[i]);
    }
    printf("\n");

    return 0;
}












//  this is a c code which take an character array as an input and convert that to a hexadecimal representation of fixed size independent of input so your task is to give me a code which do opposite of that the code should take input in a hexadecimal form and convert to characters .consider a scenerio where there is 1 output and 1 input so your code must work like that ,that it take the output of the given code and give input to above code as output
// give fully function c code . give me the complete code in single response